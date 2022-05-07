import React, { Component, ComponentClass } from 'react';

/**
 * React HOC: 获取当前窗口的尺寸
 */
function useWindowDimensions<P extends Record<string, any>>() {
  return function (
    Compnent: ComponentClass<
      P & { windowDimensions: { width: number; height: number } }
    >,
  ): ComponentClass<P> {
    return class extends Component<P, { width: number; height: number }> {
      state = this.getWindowDimensions();
      resizeListener = () => {
        this.setState(this.getWindowDimensions());
      };
      getWindowDimensions() {
        return { width: window.innerWidth, height: window.innerHeight };
      }
      componentDidMount() {
        window.addEventListener('resize', this.resizeListener, false);
      }
      componentWillUnmount() {
        window.removeEventListener('resize', this.resizeListener, false);
      }
      render() {
        const dimensions = {
          width: this.state.width,
          height: this.state.height,
        };
        return <Compnent windowDimensions={dimensions} {...this.props} />;
      }
    };
  };
}

export { useWindowDimensions };
