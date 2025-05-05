# B.R.I.R.

#### Blue Room Innovation Rules

## Branques especials

#### master
- És la branca que esta desplegada a producció. Qualsevol cosa que no pot anar a producció, no pot anar a master.
- Ha de funcionar sense cap core vinculat. Per tant qualsevol cosa que es puji a master, el core ha de estar publicat.

#### develop
- És la branca del sprint actual. 
- Tot ha de funcionar estant a les branques de develop de tots els projectes. No cal publicar core.

#### staging
- Futura branca per entorn pre producció.

## Nomeclatura de branques

#### Noves funcionalitats: 
``feature/XXX-nom-funcionalitat``

- XXX és el ID del PBI o tasca del Jira (p.e. PN2-100)

#### Bugs urgents:
``hotfix/XXX-nom-del-hotfix``

- XXX és el ID del bug del Jira (p.e. PN2-100)
- És fa PR directament a master. Despres es fa PR de master a develop per tenir el fix a tot arreu.

#### Bugs:
``fix/XXX-nom-del-fix``

- XXX és el ID del bug del Jira (p.e. PN2-100)
- Al no ser urgent, és fa PR a develop, no a master.
