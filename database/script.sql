create database db_lionbook_g_b;

use db_lionbook_g_b;

create table tbl_usuario(
	id int primary key auto_increment,
    login varchar(45) not null, 
    senha varchar(45) not null
		);
        
create table tbl_livro(
	id int primary key auto_increment,
    titulo varchar(100) not null,
    data_publicacao date, 
    quantidade int,
    isbn varchar(45)
    
	);
    
create table tipo_movimentacao(
	id int primary key auto_increment,
    tipo varchar(45) not null
);

create table tbl_movimentacao(
	id int primary key auto_increment,
    quantidade_movimentacao int not null,
	data_movimentacao date,
    id_usuario int,
    id_livro int,
    constraint fk_id_usuario 
    foreign key (id_usuario) references tbl_usuario(id),
    
    constraint fk_id_livro 
    foreign key (id_livro) references tbl_livro(id)
)

