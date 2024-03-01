import { 
    Entity,
    Column, 
    PrimaryGeneratedColumn, 
    Timestamp 
} from 'typeorm';

@Entity()
export class TaskSchema {
    @PrimaryGeneratedColumn("uuid")
    id: Number;
    @Column()
    title: String;
    @Column()
    body: String;
    @Column()
    createdAt: Timestamp;
}