#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["DemoProject.API/DemoProject.API.csproj", "DemoProject.API/"]
RUN dotnet restore "DemoProject.API/DemoProject.API.csproj"
COPY . .
WORKDIR "/src/DemoProject.API"
RUN dotnet build "DemoProject.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "DemoProject.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
CMD ASPNETCORE_URLS=http://*:$PORT dotnet DemoProject.API.dll
