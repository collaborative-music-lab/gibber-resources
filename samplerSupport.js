root = 'a4'

createSampler = function(sound){
  sample = samples[sound]
  cGain = 1/sample.amp
	//ptos
  degree = 60 - sample.pitch
  cRate = Math.pow(2,degree/12) 
  //returns
  if(sample.source == "freesound") 
  	{return Freesound(sample.id, { maxVoices:8, rate:cRate, gain:cGain})
    }
}

/* scale functions*/
setRoot = function(val){
  Theory.root = val
  sampleRoot = val
}
 
ptos = function(num){
  degree =  num
  return Math.pow(2,degree/12) 
}
 
major = function(degree, scale = [0,2,4,5,7,9,11]){ return toScale(degree,scale) }
 
minor = function(degree, scale = [0,2,3,5,7,8,10]){ return toScale(degree,scale) }
 
toScale = function(degree, scale){
  //console.log(degree,scale)
  
  if( !Array.isArray(scale) ) {
    console.log("toScale: arg2 should be an array")
    return ptos(root2degree(sampleRoot))
  }
  octave = Math.floor(degree / scale.length)
  degree = scale[ (degree+scale.length*Math.abs(octave)) % scale.length]
  return ptos( degree + octave*12 + root2degree(sampleRoot))
}
 
root2degree = function(val){
  if(val.length==2){
    scale = [0,2,3,5,7,8,10]
    degree = scale[val.charCodeAt(0)-97]
    octave = val.charCodeAt(1)-48-4
  } else if( val.length==3 && val.charCodeAt(0)==98){//flat
    scale = [-1,-1,2,4,6,7,9]
    degree = scale[val.charCodeAt(0)-97]
    octave = val.charCodeAt(1)-48-4
  } else if( val.length==3 && val.charCodeAt(0)==35){//sharp
    scale = [1,3,4,6,8,9,11]
    degree = scale[val.charCodeAt(0)-97]
    octave = val.charCodeAt(1)-48-4
  } else {
    console.log("improper root designation - should be a4, a#4, ab4, etc.")
    return 0
  }
  console.log(degree, octave)
  return degree + octave*12
}

/* sampler definitions*/

samples = {
  "harp" : {
    "id": 521934,
    "pitch": 51,
    "amp": 1, 
    "source": "freesound"
  },
  "rhodes" : {
    "id": 65719,
    "pitch": 39,
    "amp": 1, 
    "source": "freesound"
  },
  "marimba" : {
    "id": 577698,
    "pitch": 44.2,
    "amp": 1, 
    "source": "freesound"
  },
  "bambooMarimba" : {
    "id": 130530,
    "pitch": 60.5,
    "amp": 1.5, 
    "source": "freesound"
  },
  "ukulele" : {
    "id": 136942,
    "pitch": 62.8,
    "amp": .5, 
    "source": "freesound"
  },
  "caixa" : {
    "id": 531787,
    "pitch": 60,
    "amp": .5, 
    "source": "freesound"
  },
  "balafon" : {
    "id": 528064,
    "pitch": 49.5,
    "amp": .2, 
    "source": "freesound"
  },
  "kalimba" : {
    "id": 536550,
    "pitch": 63,
    "amp": 1, 
    "source": "freesound"
  },
  "karimba" : {
    "id": 58675,
    "pitch": 59.7,
    "amp": .2, 
    "source": "freesound"
  },
  "voice" : {
    "id": 508347,
    "pitch":60,
    "amp": .4, 
    "source": "freesound"
  }
}