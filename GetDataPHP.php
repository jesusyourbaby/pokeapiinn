<?php
header('Content-Type: application/json');

// Función para obtener los detalles de un Pokémon
function getPokemonDetails($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($ch);
    curl_close($ch);
    return json_decode($response, true);
}

// Iniciar una nueva sesión cURL
$ch = curl_init();
$url = 'https://pokeapi.co/api/v2/pokemon?limit=151';
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);

if (curl_errno($ch)) {
    $error_msg = curl_error($ch);
    echo json_encode(['error' => "Error al conectarse a la API: $error_msg"]);
} else {
    $pokemon_list = json_decode($response, true);
    $pokemon_data = [];
    foreach ($pokemon_list['results'] as $pokemon) {
        $pokemon_details = getPokemonDetails($pokemon['url']);
        $pokemon_data[] = [
            'name' => $pokemon['name'],
            'height' => $pokemon_details['height'],
            'weight' => $pokemon_details['weight'],
            'abilities' => array_map(function ($ability) {
                return $ability['ability']['name'];
            }, $pokemon_details['abilities']),
            'sprite' => $pokemon_details['sprites']['front_default'],
        ];
    }
    echo json_encode($pokemon_data);
}

curl_close($ch);
?>
