// [dependencies]
// rsa = "0.5"
// rand = "0.8"
// hex = "0.4"

use rsa::{PublicKey, RSAPrivateKey, PaddingScheme};
use rand::rngs::OsRng;
use hex;

fn main() {
    // Generate RSA key pair
    let mut rng = OsRng;
    let bits = 2048;
    let private_key = RSAPrivateKey::new(&mut rng, bits).expect("Failed to generate private key");
    let public_key = private_key.to_public_key();

    // Message to encrypt
    let message = "Hello, secret!";

    // Encrypt the message
    let encrypt_padding = PaddingScheme::PKCS1v15;
    let encrypted_message = public_key.encrypt(&mut rng, encrypt_padding, message.as_bytes())
        .expect("Failed to encrypt message");

    // Convert encrypted message to hexadecimal format
    let hex_encrypted_message = hex::encode(&encrypted_message);

    // Print the hexadecimal encrypted message
    println!("Hex Encrypted Message: {}", hex_encrypted_message);
}