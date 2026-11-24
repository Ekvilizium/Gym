# Cloud setup (not deployed)
Create a dedicated Supabase project, run supabase/schema.sql once, enable email authentication and configure the GitHub Pages redirect URL. Use only the public publishable key in the client, never service-role credentials. Before enabling sync, test two separate accounts for isolation, implement revision-checked writes and explicit conflict resolution, and require confirmation before replacing local data. Progress photos are sensitive: do not upload automatically. Current production app remains local-only.

# Apple Health
A native iOS target with HealthKit entitlement, usage descriptions and explicit authorization is required. GitHub Pages cannot access HealthKit directly. Test on a physical iPhone before enabling.
