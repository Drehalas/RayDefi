# RayDefi API Documentation

This directory contains the API documentation for the RayDefi decentralized finance platform.

## Files

- `swagger.yaml` - Complete OpenAPI 3.0.3 specification for the RayDefi API

## API Overview

The RayDefi API provides comprehensive endpoints for:

### 🪙 **Tokens**
- Get supported tokens list
- Fetch detailed token information
- Real-time price data

### 🔄 **Swap**
- Get swap quotes with price impact analysis
- Execute token swaps
- Multi-hop routing optimization

### 🏊 **Liquidity Pools**
- Browse available pools
- Add/remove liquidity
- Pool statistics and analytics

### 🚜 **Yield Farming**
- Discover farming opportunities
- Stake/unstake LP tokens
- Harvest rewards

### 🚀 **Pump**
- Token pump functionality
- Buy pump tokens
- Track pump progress

### 📊 **Statistics**
- Platform trading metrics
- Top trading pairs
- Volume and TVL data

### 👤 **User**
- Portfolio management
- Position tracking
- Balance information

## Viewing the Documentation

### Option 1: Swagger UI (Recommended)

1. **Online Swagger Editor:**
   - Go to [editor.swagger.io](https://editor.swagger.io/)
   - Copy the contents of `swagger.yaml`
   - Paste into the editor

2. **Local Swagger UI:**
   ```bash
   # Using Docker
   docker run -p 8080:8080 -v $(pwd)/docs:/usr/share/nginx/html/docs swaggerapi/swagger-ui
   ```

3. **VS Code Extension:**
   - Install "Swagger Viewer" extension
   - Right-click on `swagger.yaml` → "Preview Swagger"

### Option 2: Documentation Generators

Generate static documentation:

```bash
# Install swagger-codegen
npm install -g swagger-codegen-cli

# Generate HTML documentation
swagger-codegen generate -i docs/swagger.yaml -l html2 -o docs/html

# Generate markdown documentation
swagger-codegen generate -i docs/swagger.yaml -l dynamic-html -o docs/dynamic
```

## API Servers

The API is available on multiple environments:

- **Production:** `https://api.raydefi.com/v1`
- **Staging:** `https://staging-api.raydefi.com/v1`
- **Development:** `http://localhost:3000/api/v1`

## Authentication

The API supports two authentication methods:

1. **API Key:** Include `X-API-Key` header
2. **Bearer Token:** Include `Authorization: Bearer <token>` header

## Rate Limiting

API requests are rate-limited to ensure fair usage:

- **Free tier:** 100 requests/minute
- **Premium tier:** 1000 requests/minute
- **Enterprise:** Custom limits

## Response Format

All API responses follow this structure:

```json
{
  "success": true,
  "data": { ... },
  "error": null,
  "timestamp": "2025-01-28T12:00:00Z"
}
```

## Error Handling

Standard HTTP status codes are used:

- `200` - Success
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Rate Limited
- `500` - Internal Server Error

Error responses include detailed messages:

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "INSUFFICIENT_BALANCE",
    "message": "Insufficient token balance for swap",
    "details": { ... }
  },
  "timestamp": "2025-01-28T12:00:00Z"
}
```

## Examples

### Get Token List
```bash
curl -X GET "https://api.raydefi.com/v1/tokens" \
  -H "X-API-Key: your-api-key"
```

### Get Swap Quote
```bash
curl -X POST "https://api.raydefi.com/v1/swap/quote" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "tokenIn": "0x...",
    "tokenOut": "0x...",
    "amountIn": "1000000000000000000",
    "slippageTolerance": "0.5"
  }'
```

### Execute Swap
```bash
curl -X POST "https://api.raydefi.com/v1/swap/execute" \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "tokenIn": "0x...",
    "tokenOut": "0x...",
    "amountIn": "1000000000000000000",
    "minimumAmountOut": "990000000000000000",
    "userAddress": "0x...",
    "deadline": 1706454000
  }'
```

## SDK Usage

### JavaScript/TypeScript
```typescript
import { RayDefiAPI } from 'raydefi-sdk';

const api = new RayDefiAPI({
  apiKey: 'your-api-key',
  network: 'mainnet'
});

// Get swap quote
const quote = await api.swap.getQuote({
  tokenIn: '0x...',
  tokenOut: '0x...',
  amountIn: '1000000000000000000'
});

// Execute swap
const result = await api.swap.execute({
  ...quote,
  userAddress: '0x...'
});
```

### Python
```python
from raydefi import RayDefiAPI

api = RayDefiAPI(api_key='your-api-key')

# Get pools
pools = api.pools.get_all(sort_by='tvl')

# Add liquidity
result = api.pools.add_liquidity(
    pool_id='pool-id',
    amount0='1000000000000000000',
    amount1='2000000000000000000',
    user_address='0x...'
)
```

## Support

For API support and questions:

- **Documentation:** [docs.raydefi.com](https://docs.raydefi.com)
- **GitHub Issues:** [github.com/Drehalas/RayDefi/issues](https://github.com/Drehalas/RayDefi/issues)
- **Discord:** [discord.gg/raydefi](https://discord.gg/raydefi)
- **Email:** api-support@raydefi.com

## Contributing

To contribute to the API documentation:

1. Fork the repository
2. Make changes to `swagger.yaml`
3. Validate the OpenAPI specification
4. Submit a pull request

## Changelog

### v1.0.0 (2025-01-28)
- Initial API specification
- Core endpoints for swap, pools, farms
- User portfolio management
- Trading statistics 