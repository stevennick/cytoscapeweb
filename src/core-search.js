;(function($, $$){
	
	$$.fn.core({
		collection: function( eles ){

			if( $$.is.string(eles) ){
				return this.$( eles );
			} else if( $$.is.elementOrCollection(eles) ){
				return eles.collection();
			}

			return new $$.CyCollection( this );
		},
		
		getElementById: function(id){
			return this._private.nodes[id] || this._private.edges[id] || new $$.CyCollection( this );
		},
		
		nodes: defineSearch({
			addLiveFunction: true,
			group: "nodes"
		}),
		
		edges: defineSearch({
			addLiveFunction: true,
			group: "edges"
		}),
		
		elements: function(){
			return this.$.apply( this, arguments );
		},
		
		$: defineSearch({
			addLiveFunction: true
		}),
		
		filter: function(selector){
			if( $$.is.string(selector) ){
				return this.$(selector);
			} else if( $$.is.fn(selector) ) {
				return this.$(selector).filter(selector);
			}
		}
		
	});	
	
	
	function defineSearch( params ){
		var defaults = {
			group: undefined, // implicit group filter
			addLiveFunction: false
		};
		params = $.extend( {}, defaults, params );
		
		var groups = [];
		if( params.group == null ){
			groups = [ "nodes", "edges" ];
		} else {
			groups = [ params.group ];
		}
		
		return function( selector ){
			var cy = this;
			var elements = [];
			
			if( selector == null ){
				selector = "";
			}
			
			$.each(groups, function(i, group){
				$.each(cy._private[group], function(id, element){
					elements.push( element );
				});
			});
			
			var collection = new $$.CyCollection( cy, elements );
			
			var selector;
			if(params.group != null){
				selector = new $$.CySelector( cy, params.group, selector );
			} else {
				selector = new $$.CySelector( cy, selector );
			}
			
			return selector.filter( collection, params.addLiveFunction );
		};
	};
	
	
})(jQuery, jQuery.cytoscapeweb);
