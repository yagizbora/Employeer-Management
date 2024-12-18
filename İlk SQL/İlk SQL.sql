USE [master]
GO
/****** Object:  Database [Employeer_List]    Script Date: 2024-12-08 5:55:17 PM ******/
CREATE DATABASE [Employeer_List]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'Employeer_list', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\Employeer_List.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'Employeer_list_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\Employeer_List_log.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [Employeer_List] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [Employeer_List].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [Employeer_List] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Employeer_List] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Employeer_List] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Employeer_List] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Employeer_List] SET ARITHABORT OFF 
GO
ALTER DATABASE [Employeer_List] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [Employeer_List] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Employeer_List] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Employeer_List] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Employeer_List] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [Employeer_List] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Employeer_List] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Employeer_List] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Employeer_List] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Employeer_List] SET  DISABLE_BROKER 
GO
ALTER DATABASE [Employeer_List] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Employeer_List] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [Employeer_List] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [Employeer_List] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [Employeer_List] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Employeer_List] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [Employeer_List] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [Employeer_List] SET RECOVERY FULL 
GO
ALTER DATABASE [Employeer_List] SET  MULTI_USER 
GO
ALTER DATABASE [Employeer_List] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [Employeer_List] SET DB_CHAINING OFF 
GO
ALTER DATABASE [Employeer_List] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [Employeer_List] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [Employeer_List] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [Employeer_List] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'Employeer_List', N'ON'
GO
ALTER DATABASE [Employeer_List] SET QUERY_STORE = ON
GO
ALTER DATABASE [Employeer_List] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [Employeer_List]
GO
/****** Object:  Table [dbo].[Complaint]    Script Date: 2024-12-08 5:55:17 PM ******/
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
/****** Object:  Table [dbo].[Customer]    Script Date: 2024-12-08 5:55:17 PM ******/
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
 CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Departmants]    Script Date: 2024-12-08 5:55:17 PM ******/
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
/****** Object:  Table [dbo].[Employeer_List]    Script Date: 2024-12-08 5:55:17 PM ******/
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
/****** Object:  Table [dbo].[Need]    Script Date: 2024-12-08 5:55:17 PM ******/
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
/****** Object:  Table [dbo].[Notes]    Script Date: 2024-12-08 5:55:17 PM ******/
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
/****** Object:  Table [dbo].[Order]    Script Date: 2024-12-08 5:55:17 PM ******/
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
/****** Object:  Table [dbo].[Priority]    Script Date: 2024-12-08 5:55:17 PM ******/
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
/****** Object:  Table [dbo].[Project]    Script Date: 2024-12-08 5:55:17 PM ******/
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
/****** Object:  Table [dbo].[Users]    Script Date: 2024-12-08 5:55:17 PM ******/
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
 CONSTRAINT [PK_Users] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
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
USE [master]
GO
ALTER DATABASE [Employeer_List] SET  READ_WRITE 
GO
