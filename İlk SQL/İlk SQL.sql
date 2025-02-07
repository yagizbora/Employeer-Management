USE [Employeer_List]
GO
/****** Object:  Table [dbo].[Communication_History]    Script Date: 2025-01-23 16:59:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Communication_History](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[customer_id] [int] NULL,
	[employeer_id] [int] NULL,
	[communaction_type] [varchar](max) NULL,
	[details] [varchar](max) NULL,
	[is_deleted] [bit] NULL,
	[timestamp] [datetime] NULL,
	[rating] [int] NULL,
 CONSTRAINT [PK_Communication History] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Complaint]    Script Date: 2025-01-23 16:59:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Complaint](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[employeer_id] [int] NOT NULL,
	[is_deleted] [bit] NOT NULL,
	[complaint_title] [varchar](max) NOT NULL,
	[complaint_description] [varchar](max) NOT NULL,
 CONSTRAINT [PK_Complaint] PRIMARY KEY NONCLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Customer]    Script Date: 2025-01-23 16:59:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Customer](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[customer_name] [varchar](max) NOT NULL,
	[customer_address] [varchar](max) NULL,
	[customer_phone] [varchar](max) NOT NULL,
	[is_deleted] [bit] NULL,
	[customer_company] [varchar](max) NULL,
	[customer_email] [varchar](max) NULL,
	[is_important_customer] [bit] NULL,
	[is_customer_active] [bit] NULL,
 CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Departmants]    Script Date: 2025-01-23 16:59:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Departmants](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Departman] [nvarchar](50) NULL,
	[IS_DELETED] [bit] NULL,
 CONSTRAINT [PK_Departmants] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Employeer_List]    Script Date: 2025-01-23 16:59:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Employeer_List](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [varchar](50) NULL,
	[Position] [varchar](50) NULL,
	[Salary] [nvarchar](50) NULL,
	[IS_DELETED] [bit] NULL,
	[departmant_id] [int] NOT NULL,
	[is_work] [bit] NULL,
 CONSTRAINT [PK_Employeer_List] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Need]    Script Date: 2025-01-23 16:59:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Need](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[need_title] [varchar](max) NOT NULL,
	[need_description] [varchar](max) NOT NULL,
	[need_subject] [varchar](max) NOT NULL,
	[employeer_id] [int] NOT NULL,
	[is_deleted] [bit] NULL,
	[departman_id] [int] NULL,
	[priority_id] [int] NULL,
 CONSTRAINT [PK_Need] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Notes]    Script Date: 2025-01-23 16:59:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Notes](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[note_title] [varchar](max) NOT NULL,
	[note_description] [nvarchar](max) NOT NULL,
	[is_important] [bit] NOT NULL,
	[is_deleted] [bit] NOT NULL,
 CONSTRAINT [PK_Notes] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Order]    Script Date: 2025-01-23 16:59:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Order](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[employeer_id] [int] NULL,
	[departman_id] [int] NULL,
	[order_name] [nvarchar](max) NULL,
	[order_description] [nvarchar](max) NULL,
	[is_complated] [bit] NULL,
	[start_date] [date] NULL,
	[end_date] [date] NULL,
	[IS_DELETED] [bit] NULL,
 CONSTRAINT [PK_Order] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Priority]    Script Date: 2025-01-23 16:59:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Priority](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[priority] [nvarchar](max) NULL,
 CONSTRAINT [PK_Priority] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Project]    Script Date: 2025-01-23 16:59:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Project](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[customer_name_id] [int] NULL,
	[project_name] [varchar](max) NULL,
	[project_web_url] [varchar](max) NULL,
	[is_deleted] [bit] NULL,
 CONSTRAINT [PK_Project] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 2025-01-23 16:59:25 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[username] [varchar](max) NULL,
	[password] [varchar](max) NULL,
	[token] [varchar](max) NULL,
	[is_aktif] [bit] NULL,
	[is_admin] [bit] NULL,
	[is_logged] [bit] NULL,
	[email] [varchar](max) NULL,
	[name] [varchar](255) NULL,
	[surname] [varchar](255) NULL,
	[image_path] [varchar](255) NULL,
	[super_admin] [bit] NULL,
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[Communication_History]  WITH CHECK ADD  CONSTRAINT [FK_Communication History_Customer] FOREIGN KEY([customer_id])
REFERENCES [dbo].[Customer] ([id])
GO
ALTER TABLE [dbo].[Communication_History] CHECK CONSTRAINT [FK_Communication History_Customer]
GO
ALTER TABLE [dbo].[Communication_History]  WITH CHECK ADD  CONSTRAINT [FK_Communication History_Employeer_List] FOREIGN KEY([employeer_id])
REFERENCES [dbo].[Employeer_List] ([id])
GO
ALTER TABLE [dbo].[Communication_History] CHECK CONSTRAINT [FK_Communication History_Employeer_List]
GO
ALTER TABLE [dbo].[Complaint]  WITH CHECK ADD  CONSTRAINT [FK_Complaint_Employeer_List] FOREIGN KEY([employeer_id])
REFERENCES [dbo].[Employeer_List] ([id])
GO
ALTER TABLE [dbo].[Complaint] CHECK CONSTRAINT [FK_Complaint_Employeer_List]
GO
ALTER TABLE [dbo].[Need]  WITH CHECK ADD  CONSTRAINT [FK_Need_Employeer_List] FOREIGN KEY([priority_id])
REFERENCES [dbo].[Priority] ([id])
GO
ALTER TABLE [dbo].[Need] CHECK CONSTRAINT [FK_Need_Employeer_List]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_Departmants] FOREIGN KEY([departman_id])
REFERENCES [dbo].[Departmants] ([id])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_Departmants]
GO
ALTER TABLE [dbo].[Order]  WITH CHECK ADD  CONSTRAINT [FK_Order_Employeer_List] FOREIGN KEY([employeer_id])
REFERENCES [dbo].[Employeer_List] ([id])
GO
ALTER TABLE [dbo].[Order] CHECK CONSTRAINT [FK_Order_Employeer_List]
GO
ALTER TABLE [dbo].[Project]  WITH CHECK ADD  CONSTRAINT [FK_Project_Customer] FOREIGN KEY([customer_name_id])
REFERENCES [dbo].[Customer] ([id])
GO
ALTER TABLE [dbo].[Project] CHECK CONSTRAINT [FK_Project_Customer]
GO
