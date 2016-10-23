<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateCatEstados extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('cat_estados', function (Blueprint $table) {
            $table->increments('id_estado');
            $table->string('desc_estado',300);
            $table->integer('id_pais');
            $table->timestamps();
            $table->foreign('id_pais')->references('id_pais')->on('cat_paises');



    });

    }


    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('cat_estados');
    }
}
