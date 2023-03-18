# E=Banking System

Online Bank

You can check [the deployed app](https://ebankingsystem.herokuapp.com/)
or you can follow the below steps to run it locally

(In both you can use the following account for admin access)

mail: admin@ebanking.com  
password: @dmiN!23


## Installation

1. Clone the repo
2. Make sure you have the necessary environments instlaled in your system;

- [.NET 6 SDK](https://dotnet.microsoft.com/en-us/download),
- [Postgres Database](https://www.postgresql.org/download/)

3. Register to SendGrid mail service  
Open `appsettings.json` and update your email, password and mail service key in `SendGrid` section also update your database username and password in `ConnectionStrings/Development` section
4. Update `appsettings.json` with the following:
- in `ConnectionString: Development` section: udate your database username and password
   
5. Run `dotnet tool install --global dotnet-ef` then `dotnet ef database update`
6. Run the application by  
   `dotnet run` or `dotnet watch run` for development purposes

## Contributing
Developed by Sprints Team 12  
Amir Latif: Backend and linking Backend to Frontend 
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
