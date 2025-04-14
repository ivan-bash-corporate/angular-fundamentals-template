import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: 'duration'
})
export class DurationPipe implements PipeTransform {
    transform(value: number): string {
        if (value < 0) {
            return '00:00'
        }

        const hours = Math.floor(value / 60);
        const minutes = value % 60;

        const formattedHours = hours < 10 ? '0' + hours : hours;
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

        return `${formattedHours}:${formattedMinutes}`;
    }
}
