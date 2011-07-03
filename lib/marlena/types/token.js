

function Token( _reteNode, _parent, _wmelement ){
	
	this.parent = _parent;
	this.wmelement = _wmelement;
	this.node = _reteNode;
	this.children = [];
	this.joinResults = [];
	this.nccResults = [];
	this.owner = null;

	this.children.unshift( this );

	if ( _wmelement != null ){
                _wmelement.tokens.unshift ( this );
        }


}
