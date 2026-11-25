export type Mode='strength'|'body'|'cardio'|'time'|'interval';
export type TypedExercise={name:string;mode?:Mode;seconds?:number;reps:string};
export type TimedResult={seconds:number;distance?:number;resistance?:number};
export function modeOf(e:TypedExercise):Mode {if(e.mode)return e.mode;const n=e.name.toLowerCase();if(/велотренаж|велосипед|беговая дорож|эллипс|кардио|cycling|stationary bike|treadmill|elliptical|rowing machine|stairmaster|walking|running|jump rope/.test(n))return 'cardio';if(/планка|растяж|вис на|plank|stretch|dead hang/.test(n))return 'time';if(/подтягив|отжиман|pull.up|push.up|chin.up|dip\b/.test(n))return 'body';return 'strength'}
export const timed=(e:TypedExercise)=>['cardio','time','interval'].includes(modeOf(e));
export const targetSeconds=(e:TypedExercise)=>e.seconds??(modeOf(e)==='cardio'?1200:30);
export function defaults(name:string){const mode=modeOf({name,reps:''});return {name,mode,sets:mode==='cardio'?1:3,reps:'8–12',seconds:mode==='cardio'?1200:30}}
