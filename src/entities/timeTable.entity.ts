import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Lesson } from './lesson.entity';

export enum Day {
  SUN = 'Sun',
  MON = 'Mon',
  TUE = 'Tue',
  WED = 'Wed',
  THU = 'Thu',
  FRI = 'Fri',
  SAT = 'Sat',
}

@Entity()
export class TimeTable extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne((type) => Lesson, (lesson) => lesson.timeTable)
  lesson: Lesson;

  @Column({ type: 'enum', enum: Day })
  day: Day;
  //enum?

  @Column({ type: 'time' })
  time: number;
}
