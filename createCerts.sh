#!/bin/bash
test "$(whoami)" != "root" && echo "Please run as root, running as $(whoami)" && exit 1

ROOT_PATH=$(pwd)

# Create certs folder if it does not exist and enter it
[ -d certs ] || mkdir certs
CERT_PATH="$ROOT_PATH/certs"
cd "$CERT_PATH" || echo "Could not find directory $CERT_PATH" exit
echo "Creating cert and key"

######################
# Become a Certificate Authority
######################
SUBJECT="/C=GB/ST=Birmingham/L=Birmingham/O=temp/OU=temp2/CN=localhost"
# Generate private key
PASSWORD= echo -ne "Enter password for private key "
read -r -s PASSWORD
openssl genrsa -des3 -passout pass:"$PASSWORD" -out CA.key 2048
# Generate root certificate
openssl req -x509 -new -nodes -key CA.key -sha256 -days 365 -subj "$SUBJECT" -passin pass:"$PASSWORD" -out CA.pem

#create a self-signed root certificate:
HOST_NAME=localhost
FILE_NAME="$HOST_NAME-node"
# Generate a private key
openssl genrsa -out "$FILE_NAME".key 2048

# Create a certificate-signing request
openssl req -new -key "$FILE_NAME".key -subj "$SUBJECT" -out "$FILE_NAME".csr

# Create a config file for the extensions
cat >"$FILE_NAME".ext <<-EOF
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names
[alt_names]
DNS.1 = $HOST_NAME # Be sure to include the domain name here because Common Name is not so commonly honoured by itself
EOF
# Create the signed certificate
openssl x509 -req -in "$FILE_NAME".csr -CA CA.pem -CAkey CA.key -CAcreateserial -passin pass:"$PASSWORD" -out "$FILE_NAME".cert -days 365 -sha256 -extfile "$FILE_NAME".ext

# Change ownership to current user
sudo chown -R "$SUDO_USER" "$CERT_PATH"
sudo chmod -R 755 "$CERT_PATH"

echo "Adding to keychain"
security add-trusted-cert -d -r trustRoot -k /Library/Keychains/System.keychain "$CERT_PATH/CA.pem"
security add-certificates -k /Library/Keychains/System.keychain "$CERT_PATH/$FILE_NAME.cert"

# Return back to working directory on script end
cd "$ROOT_PATH" || exit
