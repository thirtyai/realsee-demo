import React, { Component } from 'react';
import { Work } from '@realsee/five';
import { createFiveProvider, FiveCanvas } from '@realsee/five/react';
import { compose } from '@wordpress/compose';
import { useFetchWork } from './component/useFetchWork';
import { useWindowDimensions } from './component/useWindowDimensions';
// import { ModeController } from './controller/ModeController';
import { LookAroundController } from './controller/lookAroundController';
import { ModeController } from './controller/modeController';
import { RecorderController } from './controller/recorderController';
import { MarkController } from './controller/markController';
import { TaggingController } from './controller/taggingController';
// import { VreoProvider } from '@realsee/vreo';

/** work.json 的数据 URL */
const workURL =
  'https://vrlab-public.ljcdn.com/release/static/image/release/five/work-sample/07bdc58f413bc5494f05c7cbb5cbdce4/work.json';

const FiveProvider = createFiveProvider();

const App = compose(
  useFetchWork(workURL),
  useWindowDimensions()
)(
  class extends Component<{
    work: Work;
    windowDimensions: { width: number; height: number };
  }> {
    render() {
      const { work, windowDimensions } = this.props;
      return (
        <FiveProvider initialWork={work}>
          <FiveCanvas
            width={windowDimensions.width}
            height={windowDimensions.height}
          />
          {/* <VreoProvider></VreoProvider> */}
          <ModeController />
          <LookAroundController />
          <RecorderController />
          <MarkController />
          <TaggingController />
        </FiveProvider>
      );
    }
  }
);

export { App };
