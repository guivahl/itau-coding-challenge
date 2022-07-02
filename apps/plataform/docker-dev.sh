echo "Running setup commands..."

npm install --location=global prisma
npm install -D typescript ts-node @types/node
npx prisma generate
npx prisma migrate dev                

