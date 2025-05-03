import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    CreateDateColumn,
}
    from 'typeorm';
import UsuarioEntity from './usuario-entity';

@Entity({ name: 'departamento' })

class DepartamentoEntity {
    @PrimaryGeneratedColumn({ name: 'id_departamento' })
    id!: number;

    @Column({ name: 'nome', type: 'varchar', nullable: false })
    nome!: string;

    @CreateDateColumn({ name: 'dt_criacao', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    dtCriacao_Departamento!: Date;

    @OneToMany(() => UsuarioEntity, usuario => usuario.departamento, { nullable: true })
    usuarios?: UsuarioEntity[];
}

export default DepartamentoEntity;