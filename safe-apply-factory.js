try{ var base = window; }catch( error ){ base = exports; }
( function module( base ){
	define( "safeApplyFactory",
		[
			"angular"
		]
		function construct( ){
			var safeApplyFactory = function safeApplyFactory( moduleNamespace ){
				angular.module( moduleNamespace )
					.factory( "safeApply",
						[
							function construct( ){
								return ( function safeApply( scope ){
									if( "safeApply" in scope ){
										return;
									}
									scope.safeApply = function safeApply( method ){
										var phase = this.$root.$$phase;
										if( phase == "$apply" || phase == "$digest" ){
											if( typeof method == "function" ){
												method.call( this );
											}
										}else{
											this.$apply( method );
										}
									};
								} );
							}
						] );
			};
			base.safeApplyFactory =  safeApplyFactory;
			return safeApplyFactory;
		} );
} )( base );