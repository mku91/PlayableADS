export class SimpleTimer {
    static start(time){
        return new Promise(resolve => {
            setTimeout(() => resolve(), time);
        });
    }
}