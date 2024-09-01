import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

interface Type {
  User: string;
  Admin: string;
}

@Entity()
export class User {
  @PrimaryColumn({
    type: 'varchar',
    length: 16,
  })
  id: string;

  @Column({
    type: 'enum',
    enum: ['User', 'Admin'],
    nullable: false,
  })
  type: Type;

  @Column({
    type: 'varchar',
    length: '80',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  profile_image: string;

  @Column({
    type: 'varchar',
    length: 80,
    nullable: false,
    unique: true,
  })
  username: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 1000,
    nullable: false,
    select: false,
  })
  password: string;

  @CreateDateColumn()
  registredAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hash() {
    this.password = await bcrypt.hash(this.password, 10);
  }
  @BeforeInsert()
  async nameInsert() {
    this.name = this.username;
  }
}
