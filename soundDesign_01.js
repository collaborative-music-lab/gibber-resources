/*
Functions in this script:

Hpf(freq) //in hertz
- returns a HPF object with the desired cutoff
- future calls to cutoof should be from 0-1 
- adds filter.freq(freqInHertz) method

scale(input,inLow,inHigh,outLow,outHigh,curve=1)
- operates on a single value
- if(val<-1000) return _
- curve is pow(val,abs(curve)), and 

*/

Noise = function(cutoff=4000){
  synth = Synth({waveform:'noise'})
  synth.cutoff = cutoff/20000
  return synth 
}

Hpf = function(freq=500){
  filter= Filter({'model':4})
	filter.mode = 1
	filter.cutoff = freq/20000
  filter.freq = function(x){filter.cutoff=x/20000}
  return filter
}

scale = function(input,inLow,inHigh,outLow,outHigh,curve=1){
  if(input < -1000) return _
  val = (input-inLow)/(inHigh-inLow)
  val = val<0 ? 0 : val>1 ? 1 : val
  val = Math.pow(val,Math.abs(curve))
  val = val*(outHigh-outLow) + outLow
  return val
}