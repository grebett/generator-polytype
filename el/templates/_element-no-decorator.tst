/// <reference path="<%= pathToBower %>/polymer-ts/polymer-ts.d.ts"/>

class <%=className%> extends polymer.Base {
	is = '<%=elementName%>';

	// lifecycle methods
	ready() {
		console.log( this['is'], "ready!")
	}
}

<%=className%>.register();
