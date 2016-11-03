import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import React from "react";
import expect from "expect";
import {mount} from "enzyme";
import RootConnected, {Root} from "./index";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import jsdom from "jsdom";
import sinon from "sinon";
import * as action from "../../actions/authentication";
import * as network from "../../actions/networking";
import * as sideBar from "../../actions/side-bar";
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

const middleware = [thunk] ;
const initialState = {};
const mockStore  = configureMockStore(middleware);
const store = mockStore(initialState);


describe('<Root/>', () => {

  const props = {
    sideBar:{
      open: false
    }
  };

  const authenticationActions = {
    doLogin: function(){
      return Promise.resolve("mockAuthenticationActions");
    },
    doLogout: function(){
      return Promise.resolve("mockAuthenticationActions");
    }
  };

  const sideBarActions = {
    open: function () {
      return true;
    },
    close: function () {
      return false;
    }
  };


  it('should call action doLogin on mounting', () => {

    const doLogin = sinon.spy(action, 'doLogin');
    const request = sinon.spy(network, 'request');

    mount(<MuiThemeProvider><RootConnected store={store}/></MuiThemeProvider>);

    expect(doLogin.calledOnce);
    expect(request.calledOnce);

  });


  it('should display <div></div> with no authentication', () => {

    const wrapper = mount(<Root {...props} authenticationActions={authenticationActions}/>);
    expect(wrapper.html()).toEqual('<div></div>');

  });

  it('should display AppBar when connected', () => {

    const muiTheme = getMuiTheme();

    const wrapper = mount(<Root {...props} authenticationActions={authenticationActions} sideBarActions={sideBarActions}/>, {
      context: {muiTheme},
      childContextTypes: {muiTheme: React.PropTypes.object}
    });
    wrapper.setState({
      ready:true
    });

    expect(wrapper.find("AppBar").length).toEqual(2);

  })

});

