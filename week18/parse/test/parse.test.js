// import  assert from 'assert';
// import {parseHTML} from '../src/parser.js';

var  assert = require('assert');
var parseHTML = require('../src/parser.js');


describe('parseHTML a single element', function () {
    it('parseHTML', function () {
      let doc = parseHTML.parseHTML('<div></div>');
      let div = doc.children[0];

      assert.equal(div.tagName,'div');
      assert.equal(div.children.length,0);
      assert.equal(div.type,'element');
      assert.equal(div.attributes.length,0);
    });
});
describe('parseHTML text', function () {
    it('parseHTML', function () {
      let doc = parseHTML.parseHTML('<div class="text">hello</div>');
      let div = doc.children[0].children[0];
      assert.equal(div.type,'text');
      assert.equal(div.content,'hello');
    });
});

it('attributes class', function () {
    let doc = parseHTML.parseHTML('<div class="text">hello</div>');
    let div = doc.children[0].attributes[0];
    assert.equal(div.name,'class');
    assert.equal(div.value,'text');
  });


it('tagName match', function () {
    let doc;
    try{
      doc = parseHTML.parseHTML('<span class="text">hello</div>');
    }catch(e){
      assert.equal(e.message,`Tag start end doesn't match`);
      
    }
  });


it('endTagOpen', function () {
    let doc =  parseHTML.parseHTML('<div>a < b</div>');
    let div = doc.children[0].children[0];    assert.equal(div.content,'a < b');
    assert.equal(div.type,'text');
  });

it('selfCloseingStartTag', function () {
    let doc =  parseHTML.parseHTML('<img/>');
    let div = doc.children[0].attributes[0];  
    assert.equal(div.name,'isSelfClosing');
    assert.equal(div.value,true);
  });

it('tagName', function () {
    let doc =  parseHTML.parseHTML('<div1></div1/>');
    let div = doc.children[0].attributes[0];  
  });




it('AttributeValueSingleQuoted', function () {
    let doc =  parseHTML.parseHTML("<div   class='bc' \/test='/10/'></div>");
    let div = doc.children[0].attributes[0];
    assert.equal(div.name,'test');
    assert.equal(div.value,/10/);
  });




it('beforeAttributeValue', function () {
    let doc =  parseHTML.parseHTML('<div id = "10"   "\u0000"   class="you"></div/>');
    let div = doc.children[0].attributes[0]; 
    assert.equal(div.name,'id"10"""class');
    assert.equal(div.value,'you');
  });


it('beforeAttributeValue-tag>', function () {
    let doc =  parseHTML.parseHTML('<div class=>you"></div/>');
    let div = doc.children[0].attributes[0]; 
    // assert.equal(div.type,'startTag');
    // assert.equal(div.tagName,'div');
  });

it('beforeAttributeValue-unquoted>', function () {
    let doc =  parseHTML.parseHTML('<div class=@"you"></div/>');
    let div = doc.children[0]; 
  });

it('afterAttributeName-selfCloseingStartTag>', function () {
    let doc =  parseHTML.parseHTML('<img  id = "10"/>');
    let div = doc.children[0].attributes[0]; 
    assert.equal(div.name,'isSelfClosing');
    assert.equal(div.value,true);
  });
it('afterAttributeName->', function () {
    let doc =  parseHTML.parseHTML('<img  id = >10"/>');
  });
it('afterAttributeName-space', function () {
    let doc =  parseHTML.parseHTML('<div class=@"y ou"></div/>');
    let div = doc.children[0]
    assert.equal(div.tagName,'div');
  });
it('afterAttributeName-/', function () {
    let doc =  parseHTML.parseHTML('<div class=@"you"/>');
    let div = doc.children[0]
  });
it('afterAttributeName-&', function () {
    let doc =  parseHTML.parseHTML('<div class=@"you&name"/>');
    let div = doc.children[0].attributes[0]; 
    assert.equal(div.name,'class');
    assert.equal(div.value,'"youname"');
  });

describe('AttributeValueDoubleQuoted-&', function () {
    it('parseHTML', function () {
      let doc = parseHTML.parseHTML('<div class="text&name">hello</div>');
      let div = doc.children[0].children[0];
      assert.equal(div.type,'text');
      assert.equal(div.content,'hello');
    });
});

it('AttributeValueSingleQuoted-&', function () {
    let doc =  parseHTML.parseHTML("<div class='bc&name'></div>");
    let div = doc.children[0].attributes[0];
  });
it('AfterAttributeValueQuoted-/', function () {
    let doc =  parseHTML.parseHTML("<div class='bc'>ts</div>");
    let div = doc.children[0].attributes[0];
  });







