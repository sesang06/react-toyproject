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
        if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  }

  render() {
    return (
      <div>
        <input onChange={this.onChange} type="text" id="search" className="myInput" placeholder="Find User!" />
        <table id="usertable" className="myTable">
          <tr>
            <td>Apple</td>
          </tr>
          <tr>
            <td>Banana</td>
          </tr>
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
