<?php

namespace App\Http\Controllers;

/**
 * @OA\Info(
 *     title="Fantasy Premier League API",
 *     version="1.0.0",
 *     description="API documentation for Fantasy Premier League application",
 *     @OA\Contact(
 *         email="support@fantasypremierleague.com",
 *         name="API Support"
 *     ),
 *     @OA\License(
 *         name="MIT",
 *         url="https://opensource.org/licenses/MIT"
 *     )
 * )
 * 
 * @OA\Server(
 *     url="http://localhost:8000/api",
 *     description="Local Development Server"
 * )
 * 
 * @OA\Server(
 *     url="https://api.fantasypremierleague.com",
 *     description="Production Server"
 * )
 * 
 * @OA\SecurityScheme(
 *     type="http",
 *     scheme="bearer",
 *     securityScheme="sanctum",
 *     description="Laravel Sanctum token authentication"
 * )
 * 
 * @OA\SecurityScheme(
 *     type="apiKey",
 *     in="header",
 *     securityScheme="api_key",
 *     name="X-API-Key",
 *     description="API Key authentication"
 * )
 */
class Controller
{
    //
}