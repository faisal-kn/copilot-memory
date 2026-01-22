/**
 * Seed database with sample data
 */
import { db } from "../lib/db.js";

async function seedDatabase() {
  console.log("Seeding database...");

  try {
    // Create departments
    const departments = [
      {
        name: "Engineering",
        description: "Software development team",
        budget: 500000,
      },
      {
        name: "Marketing",
        description: "Marketing and communications",
        budget: 200000,
      },
      {
        name: "Human Resources",
        description: "HR and recruitment",
        budget: 150000,
      },
      {
        name: "Finance",
        description: "Finance and accounting",
        budget: 180000,
      },
    ];

    for (const dept of departments) {
      await db.query(
        `INSERT INTO departments (name, description, budget) 
         VALUES ($1, $2, $3) 
         ON CONFLICT (name) DO NOTHING`,
        [dept.name, dept.description, dept.budget],
      );
    }
    console.log("✅ Departments seeded");

    // Create teams
    const teamsResult = await db.query(`
      INSERT INTO teams (name, description) VALUES
        ('Backend Team', 'Server-side development'),
        ('Frontend Team', 'Client-side development'),
        ('DevOps Team', 'Infrastructure and deployment'),
        ('Marketing Team', 'Brand and campaigns')
      ON CONFLICT DO NOTHING
      RETURNING id, name
    `);
    console.log("✅ Teams seeded");

    const teams = teamsResult.rows;
    const backendTeam = teams.find((t) => t.name === "Backend Team");
    const frontendTeam = teams.find((t) => t.name === "Frontend Team");

    // Create employees
    const employees = [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@company.com",
        position: "Senior Developer",
        department: "Engineering",
        salary: 95000,
        teamId: backendTeam?.id,
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane.smith@company.com",
        position: "Tech Lead",
        department: "Engineering",
        salary: 120000,
        teamId: backendTeam?.id,
      },
      {
        firstName: "Bob",
        lastName: "Johnson",
        email: "bob.johnson@company.com",
        position: "Frontend Developer",
        department: "Engineering",
        salary: 85000,
        teamId: frontendTeam?.id,
      },
      {
        firstName: "Alice",
        lastName: "Williams",
        email: "alice.williams@company.com",
        position: "Marketing Manager",
        department: "Marketing",
        salary: 90000,
      },
      {
        firstName: "Charlie",
        lastName: "Brown",
        email: "charlie.brown@company.com",
        position: "HR Specialist",
        department: "Human Resources",
        salary: 65000,
      },
    ];

    for (const emp of employees) {
      await db.query(
        `INSERT INTO employees (first_name, last_name, email, position, department, salary, team_id)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (email) DO NOTHING`,
        [
          emp.firstName,
          emp.lastName,
          emp.email,
          emp.position,
          emp.department,
          emp.salary,
          emp.teamId || null,
        ],
      );
    }
    console.log("✅ Employees seeded");

    // Set team leaders
    if (backendTeam) {
      const leader = await db.query(
        `SELECT id FROM employees WHERE email = 'jane.smith@company.com'`,
      );
      if (leader.rows[0]) {
        await db.query(`UPDATE teams SET leader_id = $1 WHERE id = $2`, [
          leader.rows[0].id,
          backendTeam.id,
        ]);
      }
    }
    console.log("✅ Team leaders assigned");

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Seeding failed:", error.message);
    throw error;
  } finally {
    await db.end();
  }
}

seedDatabase();
