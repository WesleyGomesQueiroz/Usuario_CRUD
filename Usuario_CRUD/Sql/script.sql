create database Lab

use Lab

CREATE TABLE [dbo].[usuario](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Nome] [varchar](255) NULL,
	[Email] [varchar](255) NULL,
	[Status] [bit] NULL,
	[DataCadastro] [datetime] NULL
)