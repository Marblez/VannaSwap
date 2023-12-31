# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

import inference_pb2 as inference__pb2


class InferenceStub(object):
    """Inference service definition
    """

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.RunInference = channel.unary_unary(
                '/inference.Inference/RunInference',
                request_serializer=inference__pb2.InferenceParameters.SerializeToString,
                response_deserializer=inference__pb2.InferenceResult.FromString,
                )


class InferenceServicer(object):
    """Inference service definition
    """

    def RunInference(self, request, context):
        """Runs a model inference
        """
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_InferenceServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'RunInference': grpc.unary_unary_rpc_method_handler(
                    servicer.RunInference,
                    request_deserializer=inference__pb2.InferenceParameters.FromString,
                    response_serializer=inference__pb2.InferenceResult.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'inference.Inference', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class Inference(object):
    """Inference service definition
    """

    @staticmethod
    def RunInference(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/inference.Inference/RunInference',
            inference__pb2.InferenceParameters.SerializeToString,
            inference__pb2.InferenceResult.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)
