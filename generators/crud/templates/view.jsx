import React, { Component, PropTypes } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
<% if (hasNumber || hasString || hasJson) { -%>
import TextField from 'material-ui/TextField';
<% } -%>
<% if (hasDate) { -%>
import DatePicker from 'material-ui/DatePicker';
<% } -%>
<% if (hasBoolean) { -%>
import Toggle from 'material-ui/Toggle';
<% } -%>
<% if (properties.length > 0) { %>
import FlatButton from 'material-ui/FlatButton';
<% } %>
import * as <%= viewClassName %>Actions from '../../actions/<%= reduxFileName %>';

class <%= viewClassName -%> extends Component {
  <% if (properties.length > 0) { %>
  constructor(props) {
    super(props);

    this.state = {
    <% properties.forEach(function(property) { %>
      <%= property.name %>: <%- property.defaultValue %>,
    <% }) %>
      errorText: {
      <% properties.forEach(function(property) { %>
        <% if (property.required) { %>
          <%= property.name %>: '',
        <% } %>
      <% }) %>
      },
    };
  }
  <% } %>

  componentWillMount() {
    this.props.<%= actionName %>Actions.<%= getActionName %>();
  }

  createModelInstance = () => {
    this.props.<%= actionName %>Actions.<%= createActionName %>(this.state);
  };

  handleChange = (e, key, value) => {
    if (e) {
      e.preventDefault();
    }
    if (value === undefined || value === '') {
      const errorText = this.state.errorText;
      errorText[key] = key + ' is required';
      this.setState({ errorText })
    } else {
      const errorText = this.state.errorText;
      errorText[key] = '';
      this.setState({ errorText })
    }
    this.setState({
      [key]: value,
    });
  };

  render() {
    const styles = {
      container: {
        padding: '10px',
      },
      <% if (properties.length > 0) { %>
      creationContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      <% if (hasNumber || hasString || hasJson || hasDate) {%>
      property: {
        margin: '0px 15px 0px 0px',
      },
      <% } %>
      <% if (hasBoolean) {%>
      toggle: {
        margin: '0px 15px 0px 0px',
        width: 'auto',
      }
      <% } %>
      <% } %>
    };
    return (
      <div style={styles.container}>
        <h1><%= viewClassName -%></h1>
        <% if (properties.length > 0) { %>
        <div style={styles.creationContainer}>
          <% properties.forEach(function(property) { -%>
            <% if (property.type === 'string') { %>
              <TextField
                <% if (property.required) { %>
                errorText="This field is required"
                <% } %>
                hintText="<%= property.name %>"
                onChange={(e, value) => this.handleChange(e, '<%= property.name %>', value)}
                style={styles.property}
                value={this.state.<%= property.name %>}
              />
            <% } else if (property.type === 'date') { %>
              <DatePicker
                hintText="<%= property.name %>"
                onChange={(e, value) => this.handleChange(e, '<%= property.name %>', value)}
                style={styles.property}
                value={this.state.<%= property.name %>}
              />
            <% } else if (property.type === 'boolean') { %>
              <Toggle
                label="<%= property.name %>"
                onToggle={(e, value) => this.handleChange(e, '<%= property.name %>', value)}
                style={styles.toggle}
                value={this.state.<%= property.name %>}
              />
            <% } else if (property.type === 'number') { %>
              <TextField
                <% if (property.required) { %>
                errorText="This field is required"
                <% } %>
                hintText="<%= property.name %>"
                onChange={(e, value) => this.handleChange(e, '<%= property.name %>', value)}
                style={styles.property}
                type="number"
                value={this.state.<%= property.name %>}
              />
            <% } else if (property.type === 'json') { %>
              <TextField
                <% if (property.required) { %>
                errorText="This field is required"
                <% } %>
                hintText="<%= property.name %>"
                onChange={(e, value) => this.handleChange(e, '<%= property.name %>', value)}
                multiLine
                style={styles.property}
                value={this.state.<%= property.name %>}
              />
            <% } %>
          <% }) %>
          <FlatButton
            label="Submit"
            onTouchTap={this.createModelInstance}
          />
        </div>
        <% } %>
        <Table> selectable={false} >
          <TableHeader displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>id</TableHeaderColumn>
              <% properties.forEach(function(property) { %>
              <TableHeaderColumn><%= property.name %></TableHeaderColumn>
              <% }) %>
            </TableRow>
          </TableHeader>
          <TableBody deselectOnClickaway={false} >
            {_.map(this.props.<%= propName %>, (data, index) => (
              <TableRow key={index}>
                <TableRowColumn>
                  { data.id }
                </TableRowColumn>
                <% properties.forEach(function(property) { %>
                <TableRowColumn>
                  { data.<%= property.name %> }
                </TableRowColumn>
                <% }) %>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

<%= viewClassName -%>.propTypes = {
  <%= propName %>: PropTypes.array.isRequired,
  <%= actionName %>Actions: PropTypes.shape({
    <%= getActionName %>: PropTypes.func.isRequired,
    <%= createActionName %>: PropTypes.func.isRequired,
  })
};

function mapStateToProps(state) {
  return {
    <%= propName %>: state.<%= reduxFileName %>,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    <%= actionName %>Actions: bindActionCreators(<%= viewClassName %>Actions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(<%= viewClassName -%>);
