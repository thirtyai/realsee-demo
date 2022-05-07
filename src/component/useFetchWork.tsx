import React, { Component, ComponentClass } from 'react';
import { Work, parseWork } from '@realsee/five';

/**
 * React HOC 获取 work
 * @param url work.json 的地址
 */
function useFetchWork<P extends Record<string, any>>(url: string) {
  return function (
    Compnent: ComponentClass<P & { work: Work }>,
  ): ComponentClass<P> {
    return class extends Component<P, { work: Work | null }> {
      state = { work: null };
      componentDidMount() {
        fetch(url)
          .then((res) => res.json())
          .then((json) => {
            this.setState({ work: parseWork(json) });
          });
      }
      render() {
        if (this.state.work === null) return null;
        return <Compnent work={this.state.work} {...this.props} />;
      }
    };
  };
}

export { useFetchWork };
