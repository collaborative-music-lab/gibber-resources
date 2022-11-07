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

ptos = function(num){
  degree = 60 - num
  return Math.pow(2,degree/12) 
}