import React, { Component } from "react";
const $ = window.jQuery;

export default class Select2Ajax extends Component {
  componentDidMount() {
    const { value, text } = this.props.dataSet;
    const { queryFieldName } = this.props;
    console.log(value, text);
    this.$el = $(this.el);
    this.$el.select2({
      width: "300px",
      ajax: {
        url: this.props.url,
        dataType: "json",
        data: (params) => {
          return {
            [queryFieldName]: params.term,
          };
        },
        processResults: (data) => {
          return {
            results: data.map((a) => ({
              id: a[value],
              text: a[text],
            })),
          };
        },
      },
    });
    this.handleChange = this.handleChange.bind(this);
    this.$el.on("change", this.handleChange);
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    this.$el.off("change", this.handleChange);
    this.$el.select2("destroy");
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    return <select ref={(el) => (this.el = el)}></select>;
  }
}
