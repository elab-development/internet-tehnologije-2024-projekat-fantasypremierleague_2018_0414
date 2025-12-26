<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('players', function (Blueprint $table) {
            // Drop the foreign key constraint first
            // Then drop the actual column
            $table->dropColumn('clubs_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('players', function (Blueprint $table) {
            // Re-add the column and constraint
            $table->string('clubs_id')->nullable()->constrained('clubs')->onDelete('set null');
        });
    }
};
