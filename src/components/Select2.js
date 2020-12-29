import React, { Component } from "react";
const $ = window.jQuery;

export default class Select2 extends Component {
  componentDidMount() {
    this.$el = $(this.el);
    this.$el.select2({
      width: "300px",
    });
    this.handleChange = this.handleChange.bind(this);
    this.$el.on("change", this.handleChange);
  }

  componentWillUnmount() {
    this.$el.off("change", this.handleChange);
    this.$el.select2("destroy");
  }

  handleChange(e) {
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <select ref={(el) => (this.el = el)} defaultValue="-1">
        {this.props.children}
      </select>
    );
  }
}
