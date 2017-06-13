import React, { Component } from 'react';
import './index.css';
import { connect } from 'react-redux';

class Search extends Component {
  constructor() {
    super();
    this.onChange = this.onChange.bind(this)
  }

  onChange() {
    var input, filter, table, tr, td, i;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    table = document.getElementById("usertable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        if (input.value == "") {
          tr[i].style.display = "none";
        } else if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "block";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  render() {
    let len = this.props.list.length
    return (
      <div>
        <input onChange={this.onChange} type="text" id="search" className="myInput" placeholder="Find User!" />
        <table id="usertable" className="myTable">
          {Array.apply(null, Array(len)).map(function(item, i) {
            return (
              <tr id={this.props.list[i]} onClick={this.props.onClick}><td>{this.props.list[i]}</td></tr>
            );
          }, this)}
        </table> 
      </div>
    )
  }
}

let mapStateToProps=(state)=>{
  return {
  };
}

let mapDispatchToProps=(dispatch)=>{
  return {
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
