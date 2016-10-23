<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDetalleSouvenirs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('detalle_souvenirs', function (Blueprint $table) {
            $table->increments('id_detalle_souvenirs');
            $table->integer('id_souvenir');
            $table->integer('id_cat_souvenir');
            $table->integer('id_talla');
            $table->string('ruta_imagen_souvenir');
            $table->timestamps();

            $table->foreign('id_souvenir')->references('id_souvenir')->on('souvenirs');
            $table->foreign('id_cat_souvenir')->references('id_cat_souvenir')->on('cat_souvenirs');
            $table->foreign('id_talla')->references('id_talla')->on('cat_tallas');


        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('detalle_souvenirs');
    }
}
