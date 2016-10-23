<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateHistoriates extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('historietas', function (Blueprint $table) {
            $table->increments('id_historieta');
            $table->string('nombre_historieta',300);
            $table->string('ruta_historieta',300);
            $table->integer('id_usuario');
            $table->date('fecha_captura');
            $table->timestamps();

            $table->foreign('id_usuario')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('historietas');
    }
}
