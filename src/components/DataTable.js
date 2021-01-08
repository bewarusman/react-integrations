import React, { Component } from "react";

// requiring jquery with datatables
var $ = require("jquery");
$.DataTable = require("datatables.net");

export default class DataTable extends Component {
  componentDidMount() {
    this.$el = $(this.el);
    this.currentTable = this.$el.DataTable();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.children !== this.props.children) {
      this.currentTable.ajax.reload();
    }
  }

  componentWillUnmount() {
    this.currentTable.destroy();
  }

  render() {
    return (
      <table ref={(el) => (this.el = el)} className="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Completed</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{this.props.children}</tbody>
      </table>
    );
  }
}
