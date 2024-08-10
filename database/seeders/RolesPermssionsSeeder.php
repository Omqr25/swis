<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolesPermssionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create roles
        $adminRole = Role::create(['name' => 'admin']);
        $keeperRole = Role::create(['name' => 'keeper']);
        $donorRole = Role::create(['name' => 'donor']);

        // Define permissions
        $permissions = [
            'Ali',
            'warehouse'
        ];

        // Create permissions
        foreach ($permissions as $permission) {
            Permission::findOrCreate($permission, 'web');
        }

        // Assign permissions to roles
        $adminRole->syncPermissions(['Ali']);
        $keeperRole->givePermissionTo('warehouse');
        $donorRole->givePermissionTo($permissions);

        // Create users and assign roles
        $adminUser = User::factory()->create([
            'name' => 'Admin name',
            'email' => 'AdminName@Admin.com',
            'password' => bcrypt('password'),
        ]);
        $adminUser->assignRole($adminRole);
        $adminUser->givePermissionTo('Ali');

        $keeperUser = User::factory()->create([
            'name' => 'Keeper name',
            'email' => 'KeeperName@Keeper.com',
            'password' => bcrypt('password'),
        ]);
        $keeperUser->assignRole($keeperRole);
        $keeperUser->givePermissionTo('warehouse');

    }
}
