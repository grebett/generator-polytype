/// <reference path="<%= pathToBower %>/polymer-ts/polymer-ts.d.ts"/>

@component('<%=elementName%>')
class <%=className%> extends polymer.Base {
	ready() {
		console.log( this['is'], "ready!")
	}
}

<%=className%>.register();
