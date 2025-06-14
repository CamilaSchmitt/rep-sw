import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn
} from 'typeorm';

@Entity({ name: 'departamento' })
class DepartamentoEntity {
    @PrimaryGeneratedColumn({ name: 'id_departamento' })
    id!: number;

    @Column({ name: 'nome', type: 'varchar', nullable: false })
    nome!: string;

    @CreateDateColumn({
        name: 'dt_criacao',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP'
    })
    dtCriacao!: Date;
}

export default DepartamentoEntity;
