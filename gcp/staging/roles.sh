# ROLES

# Uncomment the needed roles fo this project ( Lines starting with 'roles/' or 'projects/gringo' )
# Add the resources following the models ( EX: resource_resourceNAME )

###########################################################################################################################
###########################################################################################################################
#                                      RECURSOS COM PERMISSIONAMENTO EXTERNO                                              #
###########################################################################################################################
###########################################################################################################################


projects/gringo-staging/roles/gringo_appspot_sa_role


########################################################
#
# Editor do Projeto - Só utilizar em caso de emergência
#
########################################################

#Editor do Projeto: 
#roles/editor

########################################################
#
# Memory Store / Redis
#
########################################################

#Acesso de Gravação: 
#roles/redis.editor

#Acesso de Leitura: 
#roles/memcache.viewer

########################################################
#
# Cloud SQL
#
########################################################

#Conectar nas Instancias: 
#roles/cloudsql.client

########################################################
#
# Firestore ( NoSQL)
#
########################################################

#Usuário do Datastore (Escrita / Leitura): 
#roles/datastore.user

#Usuário somente leitura: 
#roles/datastore.viewer

########################################################
#
# Secrets Manager 
#
########################################################

#Acessor de counteúdo de segredos: 
#roles/secretmanager.secretAccessor

###########################################################################################################################
###########################################################################################################################
#                                                RECURSOS FILTRADOS IAM                                                   #
###########################################################################################################################
###########################################################################################################################

########################################################
#
# Pub / Sub
#
########################################################

#Consumir Mensagens de assinaturas:
#roles/pubsub.subscriber

#Publicar Mensagens em Tópicos:
#projects/gringo-project/roles/gringo_pub_sub_publisher

#Publicar e Consumir Mensagens:
#projects/gringo-project/roles/gringo_pub_sub

##################################
# RECURSOS - N/A
##################################

# Permissao configurada a nivel de recurso



########################################################
#
# Cloud Functions
#
########################################################

#Acesso de invocação:
# roles/cloudfunctions.invoker

##################################
# RECURSOS - Funcoes invocadas
##################################

# Lista de Funcoes de acordo com a regiao - function_<functionName>
# EX:

##########################
# Funcoes em southamerica-east1
##########################

# function_

##########################
# Funcoes em us-central1
##########################

# function_

########################################################
#
# Secrets Manager
#
########################################################

#Acessor de counteúdo de segredos:
#roles/secretmanager.secretAccessor

##################################
# RECURSOS - Lista de Segredos
##################################

# projects/<projectId>/secrets/<secretName>
# Projects IDs: Staging = 827392460223 / Production = 281364990237
# Ex: projects/827392460223/secrets/amplitude-key



########################################################
#
# Cloud Storage
#
########################################################

#Leitor de Objetos:
#roles/storage.objectViewer

#Criador de Objetos:
#roles/storage.objectCreator

#Leitor e Criador de Objetos:
#roles/storage.admin



##################################
# RECURSOS - Lista de Buckets
##################################

# projects/_/buckets/<nomeBucket>
# Ex: projects/_/buckets/staging-vehicle-prices-fipe