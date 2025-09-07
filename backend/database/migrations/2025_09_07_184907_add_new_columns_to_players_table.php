<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('players', function (Blueprint $table) {
            if (!Schema::hasColumn('players', 'first_name')) {
                $table->string('first_name')->nullable();
            }
            if (!Schema::hasColumn('players', 'second_name')) {
                $table->string('second_name')->nullable();
            }
            if (!Schema::hasColumn('players', 'position')) {
                $table->string('position')->nullable();
            }
            if (!Schema::hasColumn('players', 'total_points')) {
                $table->integer('total_points')->default(0);
            }
            if (!Schema::hasColumn('players', 'assists')) {
                $table->integer('assists')->default(0);
            }
            if (!Schema::hasColumn('players', 'goals')) {
                $table->integer('goals')->default(0);
            }
            if (!Schema::hasColumn('players', 'expected_goals')) {
                $table->decimal('expected_goals', 5, 2)->nullable();
            }
            if (!Schema::hasColumn('players', 'expected_assists')) {
                $table->decimal('expected_assists', 5, 2)->nullable();
            }
            if (!Schema::hasColumn('players', 'gw1_points')) {
                $table->decimal('gw1_points', 5, 2)->default(0);
            }
            if (!Schema::hasColumn('players', 'gw2_points')) {
                $table->decimal('gw2_points', 5, 2)->default(0);
            }
            if (!Schema::hasColumn('players', 'gw3_points')) {
                $table->decimal('gw3_points', 5, 2)->default(0);
            }
            if (!Schema::hasColumn('players', 'gw4_points')) {
                $table->decimal('gw4_points', 5, 2)->default(0);
            }
            if (!Schema::hasColumn('players', 'gw5_points')) {
                $table->decimal('gw5_points', 5, 2)->default(0);
            }
        });
    }

    public function down()
    {
        Schema::table('players', function (Blueprint $table) {
            $table->dropColumn([
                'first_name',
                'second_name',
                'position',
                'total_points',
                'assists',
                'goals',
                'expected_goals',
                'expected_assists',
                'gw1_points',
                'gw2_points',
                'gw3_points',
                'gw4_points',
                'gw5_points',
            ]);
        });
    }

};
