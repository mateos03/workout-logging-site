# Workout Logging Website

### Welcome! This is the code for my personal workout-tracker. It is very much still work in progress, but it is being worked on.

---

### For this project I use:

- SvelteKit - Someone mentioned it to me and I wanted to try it out. Been a positive experience up to this point.
- PostgreSQL - Wanted to go with an SQL-database as that is what I am used to and I enjoy the structure it gives.
- Tailwind - Very new to tailwind and css in general, but it has gone pretty good.
- Drizzle ORM - Awesome ORM with really good documentation, easy to use and comes pre-configured (optional) when starting a Svelte project. 
- Lucia - Used for authentication on the website. Was super easy to set up with svelte and Drizzle. Had no problems. 

---

### How to set up locally:

- Clone the repository.
- In the root folder run:  ```npm run dev```
- In docker start a postgres database with this command: ```docker run --name postgres-db -p5432:5432 -e POSTGRES_PASSWORD=mysecretpassword -d postgres```
- Create or go to your ```.env``` file and paste this: ```DATABASE_URL='postgresql://postgres:mysecretpassword@localhost:5432/postgres'```
- There is admin functionality implemented. If you want to use it, register an account with the username: ```adminuser```. 