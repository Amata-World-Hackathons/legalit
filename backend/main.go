package main

import (
	"github.com/gofiber/fiber/v2"
	"github.com/hashgraph/hedera-sdk-go/v2"
)

// TODO move this to a secrets manager
const TESTNET_ACCOUNT_ID = "account-id"
const TESTNET_PRIVATE_KEY = "private-key"

func main() {
	accountId, err := hedera.AccountIDFromString(TESTNET_ACCOUNT_ID)
	if err != nil {
		panic(err)
	}
	privateKey, err := hedera.PrivateKeyFromString(TESTNET_PRIVATE_KEY)
	if err != nil {
		panic(err)
	}

	client := hedera.ClientForTestnet()
	client.SetOperator(accountId, privateKey)

	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello World")
	})

	app.Listen(":8080")
}
