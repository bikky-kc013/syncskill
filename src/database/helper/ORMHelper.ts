import { Injectable } from '@nestjs/common';
import {
  DataSource,
  EntityTarget,
  ObjectLiteral,
  QueryRunner,
  SelectQueryBuilder,
} from 'typeorm';

@Injectable()
export default class ORMHelper {
  constructor(private readonly datasource: DataSource) {}

  async createQueryRunner(): Promise<QueryRunner> {
    try {
      const runner: QueryRunner = this.datasource.createQueryRunner();
      await runner.connect();
      return runner;
    } catch (error) {
      console.error('Failed to create QueryRunner:', error);
      throw new Error('Could not create QueryRunner');
    }
  }

  async createQueryBuilder<Entity extends ObjectLiteral>(
    Entity: EntityTarget<Entity>,
    Reference: string,
  ): Promise<SelectQueryBuilder<Entity>> {
    try {
      const queryBuilder = this.datasource.createQueryBuilder(
        Entity,
        Reference,
      );
      return queryBuilder;
    } catch (error) {
      console.error(error);
      throw new Error('Could not create QueryBuilder');
    }
  }
  commitTransaction = async (runner: QueryRunner) => {
    try {
      await runner.commitTransaction();
      await runner.release();
    } catch (error: any) {
      error.level = 'DB';
      throw error;
    }
  };
  rollBackTransaction = async (runner: QueryRunner) => {
    try {
      await runner.rollbackTransaction();
      await runner.release();
    } catch (error: any) {
      error.errorLevel = 'DB';
      throw error;
    }
  };
  releaseConnection = async (runner: QueryRunner) => {
    try {
      await runner.release();
    } catch (error: any) {
      error.errorLevel = 'DB';
      throw error;
    }
  };
}
