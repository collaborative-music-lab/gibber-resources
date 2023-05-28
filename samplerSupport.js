version = function(){
  console.log('sampler support v1.0')
}

sampleRoot = 'a4'

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
 
major = function(degree){ return toScale(degree,scale) }
 
minor = function(degree){ return toScale(degree,scale) }
 
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
  //console.log(degree, octave)
  return degree + octave*12
}

/* sampler definitions*/

samples = {
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
  },
  // "cs80" : {
  //   "id" : 526273,
  //   "pitch" : 80,
  //   "amp" : 1,
  //   "source" : "freesound"
  // },
  "pianoShort" : {
    "id" : 562754,
    "pitch" : 71,
    "amp" : 1,
    "source" : "freesound"
  }, 
  list : function(){ console.log(Object.keys(samples))},
  "harp" : {
    "id": 521934,
    "pitch": 51,
    "amp": 1, 
    "source": "freesound"
  }
}

//waveform generators
tri = function(x,f=4,a=1){
  if(x<-10000) return _
  return 4*a/f * Math.abs((((x-f/4)%f)+f)%f - f/2) - a
}

sin = function(x,f=16,a=1){
  if(x<-10000) return _
  f=f/2
  return Math.sin(2*Math.PI*x/f)*a
}

ramp = function(x,f=4,a=1){
  if(x<-10000) return _
  if(f<0) return (1+(x%f)/f) * a
  return (x%f)/f * a
}

//monitoring
monitor = function(val, length=4){
  for(i=0;i<8;i++)console.log('_')
  for(i=0;i<val.length;i++) val[i] = val[i]<-10000 ? '_' : val[i]
  for(i=0;i<val.length/length;i++) {
    val = val.slice(i*length,i*length+length)
    val2=[]
    for(j=0;j<length;j++) val2.push(parseFloat(val[j].toFixed(2)))
    console.log(val2)
  }
}

//math
floor = function(val){
  if(val < -100000) return _
  return Math.floor(val)
}

ceil = function(val){
  if(val < -100000) return _
  return Math.ceil(val)
}

peak = function(val){
  if(val < -100000) return _
  return Math.ceil(val)
}

round = function(val){
  if(val < -100000) return _
  return Math.round(val)
}

trunc = function(val){
  if(val < -100000) return _
  return Math.trunc(val)
}

abs = function(val){
  if(val < -100000) return _
  return Math.abs(val)
}

cos = function(val){
  if(val < -100000) return _
  return Math.cos(val)
}

map = function(x, low,high,min=0,max=1,curve=1){
  x = (x-low)/(high-low)
  
  if(x<0) return min
  if(x>1) return max
  
  if(curve!=1) x = Math.pow(x,Math.abs(curve))
  if(curve<0) x = -x
  
  return x*(max-min)+min
}

swing = function(division=1/16,swing=.33,tilt=0){
  //set tilt to +/- 1
  tilt = tilt>1 ? 1 : tilt<-1 ? -1 : tilt
  tilt = tilt>0 ? 1-tilt : -1-tilt
  
  let arr=[]
  let len = 1/division
  for(let i=0;i<len;i++){
    let val = i%2==0 ? swing : -swing
    if(tilt>=0){
      //tilt = tilt<0 ? Math.pow(Math.abs(tilt),1.1) :Math.pow(tilt,1.1)
      val = i%2==0 ? 
        val-Math.pow((1-tilt)*(Math.floor(i/2)/len*2),tilt)*val :
        val-Math.pow((1-tilt)*(Math.floor((i-1)/2)/len*2),tilt)*val
      //console.log( i%2==0 ? Math.pow(1*(Math.floor(i/2)/len*2),tilt)*val :Math.pow(1*(Math.floor((i-1)/2)/len*2),tilt)*val)
    } else{
      let index=len-i-1
      let atilt = Math.abs(tilt)
      val = index%2==0 ? 
        val-Math.pow((1-atilt)*(Math.floor(index/2)/len*2),atilt)*val :
        val-Math.pow((1-atilt)*(Math.floor((index-1)/2)/len*2),atilt)*val
      //console.log(index%2==0 ? Math.pow((1-atilt)*(Math.floor(index/2)/len*2),atilt)*val :Math.pow((1-atilt)*(Math.floor((index-1)/2)/len*2),atilt)*val)
    }
    val = division*(1+val)
    arr.push(val)
  }
  return arr
  //return [division*(1+swing),division*(1-swing)]
}
