import * as THREE from 'three';
import React, { Component } from 'react';
import { compose } from '@wordpress/compose';
import { EventCallback } from '@realsee/five';
import {
  withFive,
  createFiveFeature,
  PropTypeOfFiveFeatures,
} from '@realsee/five/react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

type Tag = { position?: THREE.Vector3; label: string };

const FEATURES = createFiveFeature('project2d', 'currentState', 'on', 'off');
type Props = PropTypeOfFiveFeatures<typeof FEATURES>;
type State = {
  tags: Tag[];
  newTag: Tag | null;
};

/**
 * React Component: 打标签
 */
const TaggingController = compose(withFive(FEATURES))(
  class extends Component<Props, State> {
    state: State = { tags: [], newTag: null };

    addTag = () => {
      this.setState({
        newTag: { label: window.prompt('添加标签', '') || '未命名' },
      });
    };

    tagElement(tag: Tag, key?: number | string) {
      const position =
        tag.position && this.props.$five.project2d(tag.position, true);
      const style = position
        ? { left: position.x, top: position.y }
        : { display: 'none' };
      return (
        <div className='tag' style={style} key={key}>
          <div className='tag-pannel'>
            <span className='tag-content'>{tag.label}</span>
          </div>
        </div>
      );
    }

    onIntersectionUpdate: EventCallback['intersectionOnModelUpdate'] = (
      intersect
    ) => {
      if (this.state.newTag)
        this.setState({
          newTag: { position: intersect.point, label: this.state.newTag.label },
        });
    };

    onTapGesture: EventCallback['wantsTapGesture'] = () => {
      if (this.state.newTag && this.state.newTag.position) {
        this.setState({
          tags: this.state.tags.concat(this.state.newTag),
          newTag: null,
        });
        return false;
      }
    };

    componentDidMount() {
      this.props.$five.on(
        'intersectionOnModelUpdate',
        this.onIntersectionUpdate
      );
      this.props.$five.on('wantsTapGesture', this.onTapGesture);
    }

    componentWillUnmount() {
      this.props.$five.off(
        'intersectionOnModelUpdate',
        this.onIntersectionUpdate
      );
      this.props.$five.off('wantsTapGesture', this.onTapGesture);
    }

    render() {
      return (
        <React.Fragment>
          <Paper sx={{ position: 'fixed', top: 12, left: 100 }}>
            <Button onClick={this.addTag}>打标签</Button>
          </Paper>
          {this.state.newTag && this.tagElement(this.state.newTag)}
          {this.state.tags.map((tag, index) => this.tagElement(tag, index))}
        </React.Fragment>
      );
    }
  }
);

export { TaggingController };
